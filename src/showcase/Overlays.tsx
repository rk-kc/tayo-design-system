import { useState } from 'react'
import {
  AlertTriangle,
  Calendar,
  Camera,
  Image as ImageIcon,
  ImagePlus,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { BottomSheet } from '@/components/BottomSheet'
import { UserDetailSheet } from '@/components/UserDetailSheet'
import { ActionSheet } from '@/components/ActionSheet'

export function OverlaysSection() {
  const [showDialog, setShowDialog] = useState(false)
  const [showSheet, setShowSheet] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [showActions, setShowActions] = useState(false)

  return (
    <section id="overlays" className="py-16 md:py-24">
      <SectionHeader
        eyebrow="03 · Overlays"
        title="Modals, sheets, and detail views"
        description="The signature motion of the app: bottom sheets slide up with a tuned easing curve. Center dialogs are for confirmations."
      />

      <div className="flex flex-wrap gap-3 mb-12">
        <Button variant="secondary" onClick={() => setShowDialog(true)}>
          Show dialog
        </Button>
        <Button variant="secondary" onClick={() => setShowSheet(true)}>
          Show bottom sheet
        </Button>
        <Button variant="secondary" onClick={() => setShowUser(true)}>
          Show user detail
        </Button>
        <Button variant="secondary" onClick={() => setShowActions(true)}>
          Show action sheet
        </Button>
      </div>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <div className="p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="bg-danger/15 text-danger w-11 h-11 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold mb-1">Delete this album?</h2>
              <p className="text-sm text-white/60 truncate font-ui">Tokyo Summer Trip 2026</p>
            </div>
          </div>
          <ul className="space-y-2.5 mb-5 text-sm text-white/80 font-ui">
            <li className="flex items-center gap-3">
              <ImageIcon className="w-4 h-4 text-white/40" /> 132 photos
            </li>
            <li className="flex items-center gap-3">
              <Users className="w-4 h-4 text-white/40" /> Access for 4 members
            </li>
          </ul>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              leftIcon={<Trash2 className="w-4 h-4" />}
              onClick={() => setShowDialog(false)}
            >
              Delete album
            </Button>
          </div>
        </div>
      </Dialog>

      <BottomSheet open={showSheet} onClose={() => setShowSheet(false)}>
        <h3 className="text-xl font-bold mb-2">Bottom sheet</h3>
        <p className="text-sm text-white/70 font-ui mb-4">
          Used for navigational sheets and detail views. Slides up from the bottom of the viewport
          (or the desktop frame). Click outside or hit Escape to dismiss.
        </p>
        <Button variant="primary" className="w-full" onClick={() => setShowSheet(false)}>
          Got it
        </Button>
      </BottomSheet>

      <UserDetailSheet
        open={showUser}
        onClose={() => setShowUser(false)}
        displayName="Yuki Tanaka"
        avatarUrl="https://i.pravatar.cc/150?u=yuki"
        badge={{ label: 'Event creator', tone: 'leaf' }}
        subtitle={{
          icon: <Calendar className="w-3.5 h-3.5" />,
          text: 'Joined Mar 14, 2026',
        }}
        stats={[
          { icon: <ImageIcon className="w-4 h-4" />, value: 132, label: 'photos' },
          { icon: <Sparkles className="w-4 h-4" />, value: 4, label: 'shared events' },
        ]}
      />

      <ActionSheet
        open={showActions}
        onClose={() => setShowActions(false)}
        options={[
          {
            icon: <Camera className="w-5 h-5" />,
            title: 'Take photo',
            subtitle: 'Capture a moment with your camera',
            onSelect: () => undefined,
          },
          {
            icon: <ImagePlus className="w-5 h-5" />,
            title: 'Choose from library',
            subtitle: 'Pick existing photos from this device',
            onSelect: () => undefined,
          },
        ]}
      />
    </section>
  )
}
