import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

const prisma = new PrismaClient();

// 管理者＿記事一覧取得
export const GET = async (request:NextRequest) => {
  const token = request.headers.get('Authorization') ?? '';

  const { error } = await supabase.auth.getUser(token);
  if (error) return NextResponse.json({ status: error.message }, { status: 400});

  try {
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id:true,
                name:true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ status: 'OK', posts:posts}, { status: 200});
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message}, { status:400});
  }
}

// 管理者＿記事新規作成
// 記事作成のリクエストボディの型
type CreatePostRequestBody = {
  title: string,
  content: string,
  categories: { id: number }[],
  thumbnailUrl: string,
}

// POSTという命令にすることで、POSTリクエストの時にこの関数がよばれる
export const POST = async (request:NextRequest, context: any) => {
  try {
    // リクエストのbodyを取得
    const body = await request.json();

    // bodyの中からtitle, content, categories, thumbnailUrlを取り出す
    const { title, content, categories, thumbnailUrl }: CreatePostRequestBody = body;

    // 投稿をDBに生成
    const data = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    })

    // 記事とカテゴリーの中間テーブルのレコードをDBに生成
    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          categoryId: category.id,
          postId: data.id,
        },
      })
    }

    // レスポンスを返す
    return NextResponse.json({
      status: 'OK',
      message: '作成しました',
      id: data.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400});
    }
  }
}