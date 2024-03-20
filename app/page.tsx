"use client"
import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Camera, FlipHorizontal, PersonStanding, Video } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { Rings } from 'react-loader-spinner';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

type Props = {}

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //State
  const [mirored, setMirrored] = useState<boolean>(false)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.8)
  return ( 
    <div className='flex h-screen'>
      <div className='relative'>
        <div className='relative h-screen w-full'>
          <Webcam ref={webcamRef}
          mirrored={mirored}
          className="h-full w-full object-contain p-2"
          />
          <canvas ref={canvasRef}
            className='absolute top-0 left-0 h-full w-full object-contain'
          ></canvas>
        </div>
      </div>
      <div className='flex flex-row flex-1'>
        <div className='border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4'>
          <div className='flex flex-col gap-2'>
            <ModeToggle/>
            <Button
            variant ={'outline'}
            size ={'icon'}
            onClick = {() =>{
              setMirrored((prev) =>!prev)
            }}
            ><FlipHorizontal/></Button>
            <Separator className='my-2'/>
          </div>
          {/*Middle Division */}
          <div className='flex flex-col gap-2'>
          <Separator className='my-2'/>
            <Button
            variant = {'outline'} size = {'icon'}
            onClick={userPromptScreenshot}
            >
              <Camera/>
            </Button>
            <Button
            variant = {isRecording ? 'destructive' : 'outline'} size = {'icon'}
            onClick={userPromptRecord}
            >
              <Video/>
            </Button>
            <Separator className='my-2'/>
            <Button
            variant={autoRecordEnabled ? 'destructive' : 'outline'}
            size={'icon'}
            onClick={toggleAutoRecord}
            >
              {autoRecordEnabled ? <Rings color='white' height={45}/> : <PersonStanding/>}

            </Button>
          </div>
          <div className='flex flex-col gap-2'>
          <Separator className='my-2'/>
          <Popover>
            <PopoverTrigger>
              <PopoverContent>
                <Slider
                max={1}
                min={0}
                step={0.2}
                defaultValue = {[volume]}
                />
              </PopoverContent>
            </PopoverTrigger>
          </Popover>
        </div>
        </div>
      </div>
    </div>
  )

  function userPromptScreenshot()
  {

  }
  function userPromptRecord()
  {
    
  }
  function toggleAutoRecord()
  {
    if(autoRecordEnabled)
    {
      setAutoRecordEnabled(false);
      toast("Auto Record Disabled")
    }
    else
    {
      setAutoRecordEnabled(true);
      toast("Auto Record Enabled")
    }
  }
}
export default HomePage