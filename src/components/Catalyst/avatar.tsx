'use client';

import * as React from 'react'
import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import { TouchTarget } from './button'
import { Link } from './link'

const AvatarContext = React.createContext<{ size?: string }>({})

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({
  className,
  size = 'md',
  ...props
}: AvatarProps) {
  return (
    <AvatarContext.Provider value={{ size }}>
      <div
        className={clsx(
          'relative flex shrink-0 overflow-hidden rounded-full',
          size === 'sm' && 'h-8 w-8',
          size === 'md' && 'h-10 w-10',
          size === 'lg' && 'h-12 w-12',
          className
        )}
        {...props}
      />
    </AvatarContext.Provider>
  )
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function AvatarImage({
  className,
  src,
  alt = '',
  ...props
}: AvatarImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={clsx('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  )
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function AvatarFallback({
  className,
  children,
  ...props
}: AvatarFallbackProps) {
  const { size } = React.useContext(AvatarContext)
  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center rounded-full bg-gray-100',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        size === 'lg' && 'text-base',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface AvatarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarButton = React.forwardRef(function AvatarButton(
  {
    className,
    size = 'md',
    ...props
  }: AvatarButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  let classes = clsx(
    className,
    'relative focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500'
  )

  return (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Avatar size={size}>
          {/* Add AvatarImage and AvatarFallback components here */}
        </Avatar>
      </TouchTarget>
    </Headless.Button>
  )
})
