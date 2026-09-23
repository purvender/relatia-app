import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="max-w-xl text-muted-foreground">
          A simple layout with a header and a centered container.
        </p>
      </div>
      <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          aria-label="Email address"
        />
        <Button type="submit">Continue</Button>
      </form>
    </section>
  );
}
