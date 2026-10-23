import React from 'react';
import { BulletList, Card, SectionHeader, TwoCol } from '@/features/validate/components/report/ui';

export default function StrengthsRisks({ strengths, risks }) {
  console.log('strngrths: ', strengths);
  console.log('risks: ', risks);

  return (
    <TwoCol>
      <Card className="border-emerald-200 bg-emerald-50/40">
        <SectionHeader title="Strengths" />
        <BulletList items={strengths} icon="✔" iconClass="text-emerald-600" />
      </Card>
      <Card className="border-rose-200 bg-rose-50/40">
        <SectionHeader title="Risks" />
        <BulletList items={risks} icon="▲" iconClass="text-rose-600" />
      </Card>
    </TwoCol>
  )
}
