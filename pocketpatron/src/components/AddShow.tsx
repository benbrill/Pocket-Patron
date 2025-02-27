'use client'
import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

import { z } from 'zod';

const formSchema = z.object({
  watched_at: z.string().min(1, 'Date is required'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional()
});

export default function AddShow({ show }: { show: { title: string, show_id: number } }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
          <Button variant="outline">Add Viewing</Button>
      </DrawerTrigger>
      <DrawerContent className='font-sans'>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add '{show.title}' viewing</DrawerTitle>
          <DrawerDescription>
            Add details of your patronage below. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" show_id={show.show_id}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className, show_id }: React.ComponentProps<"form"> & { show_id: number }) {
  const [formData, setFormData] = useState({
    watched_at: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<z.infer<typeof formSchema>>({
    watched_at: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: typeof formData) => ({
      ...prev,
      [id]: value
    }));
  };

  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      // Validate form data
      const validatedData = formSchema.parse(formData);
      await fetch('/api/addShow', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ show_id, ...validatedData })
      }).then(response => {
        if (!response.ok) throw new Error(`Failed to submit shows: ${response.statusText}`);

        router.replace('/comparison');
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to state
        const newErrors = error.flatten().fieldErrors;
        setFormErrors((prev: z.infer<typeof formSchema>) => ({ ...prev, ...newErrors }));
      } else {
        console.error('Error submitting shows:', error);
      }
    }
  };

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
    <div className="grid gap-2">
      <Label htmlFor="date">Date of viewing</Label>
      <Input type="date" id="watched_at" value={formData.watched_at} onChange={handleChange} />
      {formErrors.watched_at && <p className="text-red-500">{formErrors.watched_at}</p>}
    </div>
    <div className="grid gap-2">
      <Label htmlFor="notes">Notes</Label>
      <Input id="notes" placeholder="Add thoughts and feelings" value={formData.notes} onChange={handleChange} />
      {formErrors.notes && <p className="text-red-500">{formErrors.notes}</p>}
    </div>
    <Button type="submit">Add viewing</Button>
  </form>
  )
  }
