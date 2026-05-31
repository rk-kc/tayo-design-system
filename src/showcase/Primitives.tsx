import { useState } from 'react'
import { Image as ImageIcon, Users, Search, Camera, Plus } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { Button } from '@/components/Button'
import { Calendar } from '@/components/Calendar'
import { Card } from '@/components/Card'
import { DatePicker } from '@/components/DatePicker'
import { Avatar } from '@/components/Avatar'
import { Badge } from '@/components/Badge'
import { Stat } from '@/components/Stat'
import { Input } from '@/components/Input'
import { Fab } from '@/components/Fab'
import { Skeleton } from '@/components/Skeleton'

export function PrimitivesSection() {
  const [pickedDate, setPickedDate] = useState<Date | null>(null)
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [pickerStart, setPickerStart] = useState<Date | null>(null)
  const [pickerEnd, setPickerEnd] = useState<Date | null>(null)

  return (
    <section id="primitives" className="py-16 md:py-24">
      <SectionHeader
        eyebrow="02 · Primitives"
        title="The building blocks"
        description="Every screen in Tayo is composed from this short list. Each variant has a purpose — pick the one that matches intent."
      />

      <Group title="Buttons">
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">Save event</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="ghost">Skip</Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-3">
          <Button variant="primary" size="sm">Sm</Button>
          <Button variant="primary" size="md">Md (default)</Button>
          <Button variant="primary" size="lg">Lg</Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-3">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New event
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </Group>

      <Group title="Cards">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <Card>
            <h4 className="text-base font-bold mb-1">Standard card</h4>
            <p className="text-sm text-white/55">
              The default glass surface for grouped content.
            </p>
          </Card>
          <Card interactive>
            <h4 className="text-base font-bold mb-1">Interactive card</h4>
            <p className="text-sm text-white/55">Tap me — adds press scale + hover lift.</p>
          </Card>
        </div>
      </Group>

      <Group title="Avatar">
        <div className="flex items-end gap-4">
          <Avatar name="Yuki Tanaka" size="sm" />
          <Avatar name="Yuki Tanaka" size="md" />
          <Avatar name="Yuki Tanaka" size="lg" />
          <Avatar name="Yuki Tanaka" size="xl" glow />
        </div>
      </Group>

      <Group title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge tone="leaf">Event creator</Badge>
          <Badge tone="sun">Recent</Badge>
          <Badge tone="neutral">Member</Badge>
          <Badge tone="ok">Live</Badge>
          <Badge tone="danger">Deleted</Badge>
        </div>
      </Group>

      <Group title="Stats">
        <div className="flex gap-3 flex-wrap">
          <Stat icon={<ImageIcon className="w-4 h-4" />} value={132} label="photos" />
          <Stat icon={<Users className="w-4 h-4" />} value={4} label="shared events" />
        </div>
      </Group>

      <Group title="Input">
        <div className="max-w-sm space-y-3">
          <Input inputSize="sm" placeholder="Small (h-9)" />
          <Input inputSize="md" placeholder="Medium / default (h-12)" />
          <Input inputSize="lg" placeholder="Large (h-14)" />
        </div>
        <div className="max-w-sm space-y-3 mt-4">
          <Input inputSize="sm" leftIcon={<Search />} placeholder="Search…" />
          <Input inputSize="md" leftIcon={<Search />} placeholder="Search friends…" />
          <Input inputSize="lg" leftIcon={<Search />} placeholder="Find an event…" />
        </div>
        <div className="max-w-sm mt-4">
          <p className="text-xs text-white/40 mb-2">Heights match Button sizes:</p>
          <div className="flex gap-2 items-center">
            <Input inputSize="md" placeholder="Join code" />
            <Button size="md">Join</Button>
          </div>
        </div>
      </Group>

      <Group title="FAB">
        <div className="relative h-24 max-w-sm glass-surface rounded-2xl flex items-center justify-center text-xs text-white/40">
          (placement preview)
          <Fab fixed={false} icon={<Camera className="w-6 h-6" />} label="Add photo" />
        </div>
      </Group>

      <Group title="Skeleton">
        <Card padding="md" className="max-w-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </Card>
      </Group>

      <Group title="Calendar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <div>
            <p className="text-xs text-white/40 mb-2">Single date pick</p>
            <Calendar value={pickedDate} onChange={setPickedDate} className="max-w-sm" />
            <p className="text-xs text-white/50 mt-2">
              Selected:{' '}
              <span className="text-white">
                {pickedDate ? pickedDate.toDateString() : '—'}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40 mb-2">With minDate (today)</p>
            <Calendar
              value={rangeStart}
              onChange={setRangeStart}
              minDate={new Date()}
              className="max-w-sm"
            />
          </div>
        </div>
      </Group>

      <Group title="DatePicker">
        <div className="max-w-sm space-y-3">
          <p className="text-xs text-white/40">
            Input-shaped trigger that opens the calendar in a bottom sheet. Drop into forms
            next to other Inputs.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <DatePicker
              value={pickerStart}
              onChange={setPickerStart}
              placeholder="Start date"
              sheetTitle="Start date"
            />
            <DatePicker
              value={pickerEnd}
              onChange={setPickerEnd}
              placeholder="End date"
              minDate={pickerStart ?? undefined}
              sheetTitle="End date"
            />
          </div>
        </div>
      </Group>
    </section>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}
