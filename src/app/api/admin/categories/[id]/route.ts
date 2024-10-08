import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type UpdateCategoryRequestBody = {
  name: string
}

export const PUT = async ( 
  request: NextRequest,
  { params }: { params: {id: string } }
) => {
  const { id } = params;
  const { name }: UpdateCategoryRequestBody = await request.json();

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    })

    return NextResponse.json({ status: 'OK', category }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
}


export const DELETE = async (
  request: NextRequest,
  { params }: { params: {id: string} },
) => {
  const { id } = params;
  
  try {
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    })

    return NextResponse.json({ status: 'OK' }, { status: 200});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400});
    }
  }
}