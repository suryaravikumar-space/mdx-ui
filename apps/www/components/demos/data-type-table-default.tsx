import { DataTypeTable } from "@/components/mdx/data-type-table"

export default function DataTypeTableDefault() {
  return (
    <DataTypeTable
      caption="Common AI/ML numeric data types"
      rows={[
        { type: "INT8",  bits: 8,  range: "-128 to 127",   quantized: true,  description: "Inference-optimised integer" },
        { type: "FP16",  bits: 16, range: "±65504",         quantized: false, description: "Half-precision float" },
        { type: "BF16",  bits: 16, range: "±3.39 × 10³⁸",  quantized: false, description: "Brain float 16" },
        { type: "FP32",  bits: 32, range: "±3.4 × 10³⁸",   quantized: false, description: "Full-precision float" },
      ]}
    />
  )
}
