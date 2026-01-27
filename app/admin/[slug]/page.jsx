import AdminContent from '@/components/admin/AdminContent';
import React from 'react'

export default async function page({params}) {
  const {slug} = await params;
  return (
    <AdminContent tab={slug} />
  )
}

