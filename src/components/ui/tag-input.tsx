import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const tagInputVariants = cva(
  'flex flex-wrap gap-1 min-h-[20px] w-full rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive/50 text-destructive destructive:focus-visible:ring-destructive',
        outline: 'border-input hover:bg-accent',
        secondary: 'border-secondary/50 bg-secondary/20 text-secondary-foreground focus-visible:ring-secondary',
        ghost: 'hover:bg-accent',
        link: 'border-transparent text-primary hover:text-primary/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tagVariants = cva(
  'inline-flex items-center gap-x-1.5 rounded-border border border-input bg-muted px-2 py-0.5 text-xs font-medium hover:bg-accent/50',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20',
        outline: 'border-input hover:bg-accent',
        secondary: 'border-secondary/50 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20',
        ghost: 'hover:bg-accent',
        link: 'border-transparent text-primary hover:text-primary/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantProps<typeof tagInputVariants>['variant'];
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  ({ className, variant, ...props }, ref) => {
    const [value, setValue] = React.useState('');
    const [tags, setTags] = React.useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && value.trim() !== '') {
        e.preventDefault();
        setTags([...tags, value.trim()]);
        setValue('');
      }
      if (e.key === 'Backspace' && value === '' && tags.length > 0) {
        setTags(tags.slice(0, -1));
      }
    };

    const handleRemove = (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    };

    return (
      <div
        className={tagInputVariants({ variant, className })}
        ref={ref}
      >
        {tags.map((tag, index) => (
          <div key={index} className={tagVariants({ variant })}>
            <span>{tag}</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Remove tag"
              onClick={() => handleRemove(index)}
              className="p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Add tag"
          className="flex-1 min-w-0"
          {...props}
        />
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';

export { TagInput };