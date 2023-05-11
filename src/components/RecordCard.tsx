import { Pencil, Trash } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { getWaterMLFromType } from '../utils/helpers'
import { RecordItemType } from '../utils/storage/schema'
import { GhostButton } from './GhostButton'

interface RecordCardProps {
    item: RecordItemType[0]
    onDelete: (id: string) => void
    onEdit: (id: string) => void
}

export function RecordCard({ item, onDelete, onEdit }: RecordCardProps) {
    const [time, setTime] = useState('há poucos segundos')
    const title = new Date(item.createdAt).toLocaleString()

    const labels = {
        glass: "um copo d'água",
        bottle: "uma garrafa d'água",
    }

    const updateTime = () => {
        const formatted = dayjs(item.createdAt).fromNow()
        setTime(formatted)
    }

    useEffect(() => {
        updateTime()
        const interval = setInterval(() => updateTime())
        return () => clearInterval(interval)
    }, [])

    const mlTitle = (item.type === 'custom' ? item.ml : getWaterMLFromType(item.type)) + ' ml'

    return (
        <div className='flex items-center gap-4 w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors'>
            <div className='w-1/4 text-sm text-zinc-400'>
                <span title={title}>{time}</span>
            </div>
            <div className='w-full'>
                <span title={mlTitle}>
                    bebeu{' '}
                    {item.type === 'custom'
                        ? item.label
                            ? `no(a) ${item.label}`
                            : `${item.ml} ml de água`
                        : labels[item.type]}
                </span>
            </div>
            <div className='flex items-center gap-2'>
                <GhostButton onClick={() => onEdit(item.id)}>
                    <Pencil size={22} weight='bold' />
                </GhostButton>
                <GhostButton className='hover:bg-red-500' onClick={() => onDelete(item.id)}>
                    <Trash size={22} weight='bold' />
                </GhostButton>
            </div>
        </div>
    )
}