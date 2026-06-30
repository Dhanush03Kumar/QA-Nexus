import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import {
  DropdownMenu as RDDropdownMenu,
  DropdownMenuContent as RDDropdownMenuContent,
  DropdownMenuItem as RDDropdownMenuItem,
  DropdownMenuTrigger as RDDropdownMenuTrigger,
  DropdownMenuSeparator as RDDropdownMenuSeparator,
  DropdownMenuCheckboxItem as RDDropdownMenuCheckboxItem,
  DropdownMenuGroup as RDDropdownMenuGroup,
  DropdownMenuLabel as RDDropdownMenuLabel,
  DropdownMenuRadioGroup as RDDropdownMenuRadioGroup,
  DropdownMenuRadioItem as RDDropdownMenuRadioItem,
} from '@radix-ui/react-dropdown-menu';

const dropdownMenuContentVariants = cva(
  'min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      align: {
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
      },
    },
    defaultVariants: {
      align: 'start',
    },
  }
);

const DropdownMenu = RDDropdownMenu;
const DropdownMenuTrigger = RDDropdownMenuTrigger;

const DropdownMenuContent = ({
  className,
  align = 'start',
  children,
  ...props
}: {
  className?: string;
  align?: 'start' | 'end' | 'center';
  children: React.ReactNode;
}) => (
  <RDDropdownMenuContent
    align={align}
    className={dropdownMenuContentVariants({ align, className })}
    {...props}
  >
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </RDDropdownMenuContent>
);
DropdownMenuContent.displayName = 'RDDropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RDDropdownMenuItem> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <RDDropdownMenuItem
    className={`
      relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      ${className}
    `}
    ref={ref}
    {...props}
  />
));
DropdownMenuItem.displayName = 'RDDropdownMenuItem';

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RDDropdownMenuSeparator> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <RDDropdownMenuSeparator
    className={`-my-1 h-px bg-muted ${className}`}
    ref={ref}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'RDDropdownMenuSeparator';

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RDDropdownMenuCheckboxItem> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <RDDropdownMenuCheckboxItem
    className={`
      relative flex w-auto cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      ${className}
    `}
    ref={ref}
    {...props}
  />
));
DropdownMenuCheckboxItem.displayName = 'RDDropdownMenuCheckboxItem';

const DropdownMenuGroup = RDDropdownMenuGroup;
DropdownMenuGroup.displayName = 'RDDropdownMenuGroup';

const DropdownMenuLabel = RDDropdownMenuLabel;
DropdownMenuLabel.displayName = 'RDDropdownMenuLabel';

const DropdownMenuRadioGroup = RDDropdownMenuRadioGroup;
DropdownMenuRadioGroup.displayName = 'RDDropdownMenuRadioGroup';

const DropdownMenuRadioItem = RDDropdownMenuRadioItem;
DropdownMenuRadioItem.displayName = 'RDMenuRadioItem';

const DropdownMenuShortcut = ({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={`ml-auto text-xs tracking-widest opacity-60 ${className}`}
    {...props}
  >
    {children}
  </span>
);

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
};