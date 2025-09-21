import { NextResponse } from 'next/server';

type IGMedia = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: { data: { media_type: string; media_url?: string }[] };
};

const FIELDS =
  'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url,children{media_type,media_url}';

function makeTitle(caption?: string) {
  const t = (caption || '').trim().replace(/\s+/g, ' ');
  return t ? (t.length > 40 ? t.slice(0, 40) + '…' : t) : 'Instagram Post';
}

function pickImage(m: IGMedia) {
  if (m.media_type === 'IMAGE') return m.media_url;
  if (m.media_type === 'VIDEO') return m.thumbnail_url;
  if (m.media_type === 'CAROUSEL_ALBUM') {
    const first =
      m.children?.data?.find((c) => c.media_type === 'IMAGE') ||
      m.children?.data?.[0];
    return first?.media_url || m.media_url || m.thumbnail_url;
  }
  return m.media_url || m.thumbnail_url;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') || 12);

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN!;
  const igUserId = process.env.INSTAGRAM_IG_USER_ID!;
  if (!accessToken || !igUserId) {
    return NextResponse.json({ error: 'Missing IG envs' }, { status: 500 });
  }

  const url = new URL(`https://graph.facebook.com/v19.0/${igUserId}/media`);
  url.searchParams.set('fields', FIELDS);
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('limit', String(limit));

  const r = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!r.ok) {
    const text = await r.text();
    return NextResponse.json(
      { error: 'IG fetch failed', detail: text },
      { status: 502 }
    );
  }

  const json = await r.json();
  const items: IGMedia[] = json.data || [];

  const mapped = items.map((m) => {
    const image = pickImage(m) || '/images/no-image.jpg';
    return {
      imageSrc: image,
      title: makeTitle(m.caption),
      description: m.caption || '',
      permalink: m.permalink,
      timestamp: m.timestamp,
      id: m.id,
    };
  });

  return NextResponse.json({ posts: mapped });
}
