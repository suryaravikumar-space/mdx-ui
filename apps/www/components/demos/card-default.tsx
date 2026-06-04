import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/mdx/card";

export default function CardDefault() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Getting started</CardTitle>
        <CardDescription>
          Install and configure DocsUI in minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>Run the CLI and pick your components.</CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Free and open source.
      </CardFooter>
    </Card>
  );
}
