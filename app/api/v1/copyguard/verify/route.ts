import { NextResponse } from "next/server";

type VerifyRequest = {
  game_id?: string;
  version?: string;
  checksum?: string;
  platform?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VerifyRequest;

    const { game_id, version, checksum } = body;

    // 必須項目チェック（理由は返さない）
    if (!game_id || !version || !checksum) {
      return NextResponse.json({ status: "UNVERIFIED" });
    }

    // 仮の正解チェックサム（最初は環境変数でOK）
    const OFFICIAL_CHECKSUM = process.env.OFFICIAL_CHECKSUM;

    if (OFFICIAL_CHECKSUM && checksum === OFFICIAL_CHECKSUM) {
      return NextResponse.json({ status: "OK" });
    }

    return NextResponse.json({ status: "UNVERIFIED" });
  } catch {
    // JSON壊れてても黙ってUNVERIFIED
    return NextResponse.json({ status: "UNVERIFIED" });
  }
}

// POST以外は全部弾く（でも200で黙殺）
export function GET() {
  return NextResponse.json({ status: "UNVERIFIED" });
}
