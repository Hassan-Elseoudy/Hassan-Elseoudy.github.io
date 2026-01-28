
export default function Footer() {
  return (
    <footer className="border-t dark:border-zinc-800 border-zinc-100 mt-24 lg:min-h-[250px] min-h-full relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-y-4 md:px-16 px-6 py-16 text-center">

        <div className="flex flex-col items-center gap-y-6 mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Get In Touch</h2>
          <p className="max-w-2xl dark:text-zinc-400 text-zinc-600 text-lg">
            If you know of any positions available, have any questions, or just
            want to say hi, please feel free to email me at,{" "}
            <a
              href="mailto:hassan.elseoudy@gmail.com"
              className="text-blue-500 hover:underline"
            >
              hassan.elseoudy@gmail.com
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <div className="flex items-center gap-x-2 text-sm dark:text-zinc-400 text-zinc-600">
            <span className="font-bold font-mono">{"</>"}</span> with{" "}
            <span className="text-red-500">♥</span> by{" "}
            <a
              href="https://github.com/semsem-dev"
              target="_blank"
              rel="noreferrer noopener"
              className="dark:bg-primary-bg bg-zinc-200 dark:text-white text-zinc-800 px-2 py-1 rounded-md text-xs font-bold"
            >
              Hassan Elseoudy
            </a>{" "}
            using ⚛️
          </div>
          <p className="text-xs dark:text-zinc-500 text-zinc-500">
            Project code is open source. Feel free to fork and make your own
            version.
          </p>
        </div>
      </div>
    </footer>
  );
}
