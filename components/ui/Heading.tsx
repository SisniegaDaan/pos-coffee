export default function Heading({ children } : { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl text-center font-bold my-8">
        { children }
    </h1>
  )
}
