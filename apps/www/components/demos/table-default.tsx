import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/mdx/table"

export default function TableDefault() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>mdx-ui component install sizes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Dependencies</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Accordion</TableCell>
            <TableCell>utils</TableCell>
            <TableCell>4.2 kB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Badge</TableCell>
            <TableCell>cva, utils</TableCell>
            <TableCell>1.8 kB</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Callout</TableCell>
            <TableCell>cva, utils</TableCell>
            <TableCell>2.1 kB</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
