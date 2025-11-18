import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/app/lib/utils";

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		ref={ref}
		{...props}
		className={cn(
			// container
			"relative peer inline-flex h-7 w-12 items-center rounded-full transition-all",
			"data-[state=checked]:bg-[#34C759] data-[state=unchecked]:bg-[#E5E5EA]",
			"cursor-pointer touch-none select-none",
			// subtle iOS track shadow
			"shadow-inner shadow-black/10",
			className
		)}
	>
		{/* Thumb */}
		<SwitchPrimitives.Thumb
			className={cn(
				"block h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-out",

				"data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1"
			)}
		/>
	</SwitchPrimitives.Root>
));

Switch.displayName = "Switch";

export { Switch };
