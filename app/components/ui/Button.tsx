"use client";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import React from "react";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-black text-white hover:bg-gray-800",
				secondary: "bg-gray-200 text-black hover:bg-gray-300",
				ghost: "hover:bg-gray-100",
				outline:
					"border border-gray-300 text-black hover:bg-gray-100 hover:text-black",
			},
			size: {
				default: "h-10 px-4 py-2 text-sm",
				sm: "h-8 px-3 text-sm",
				lg: "h-12 px-6 text-base",
				icon: "h-10 w-10 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ variant, size }), className)}
				{...props}
			/>
		);
	}
);

Button.displayName = "Button";
