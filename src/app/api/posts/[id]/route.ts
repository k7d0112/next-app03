import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (
  request: NextRequest,
//   ここでクエリパラメータを受け取る
  { params }: {params: {id: string }},
) => {
//   paramsの中にidが入っているので取り出す
  const { id } = params;

  try {
    // idを元にpostをDBから取得
    const post =await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name:true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json({ status: 'OK', post:post }, {status: 200});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({status: error.message}, { status: 400});
    }
  }
}