import React from 'react'
import Pill from './Pill'
import { confTone, labelTone, ratingTone } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

export const ConfidencePill = ({ value, className }) =>
  value ? <Pill tone={confTone(value)} className={className}>{titleCase(value)} confidence</Pill> : null

export const LabelPill = ({ value, className }) =>
  value ? <Pill tone={labelTone(value)} className={className}>{titleCase(value)}</Pill> : null

export const RatingPill = ({ value, fallback, className }) =>
  value ? (
    <Pill tone={ratingTone(value)} className={className}>{titleCase(value)}</Pill>
  ) : fallback ? (
    <Pill className={className}>{titleCase(fallback)}</Pill>
  ) : null
