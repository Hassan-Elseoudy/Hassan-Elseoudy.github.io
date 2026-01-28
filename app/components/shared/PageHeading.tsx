import { Slide } from "@/app/animation/Slide";

type HeadingType = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function PageHeading({
  title,
  description,
  children,
}: HeadingType) {
  return (
    <header className="mb-10">
      <Slide>
        <div className="flex items-center gap-x-3 mb-6">
          <span className="font-mono text-zinc-400 dark:text-zinc-600 text-xl sm:text-3xl font-bold tracking-tight">
             //
          </span>
          <h1 className="max-w-3xl font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-[3.7rem]">
            {title}
          </h1>
        </div>

        <div className="relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 ml-2">
          <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed font-mono text-sm">
            <span className="opacity-50 select-none mr-2">/*</span>
            {description}
            <span className="opacity-50 select-none ml-2">*/</span>
          </p>
          {children}
        </div>
      </Slide>
    </header>
  );
}
