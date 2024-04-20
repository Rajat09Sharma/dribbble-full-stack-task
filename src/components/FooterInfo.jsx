

export default function FooterInfo({children,heading}) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 mt-4 md:mt-0 lg:mt-0">
    <h3 className="text-sm font-bold">{heading}</h3>
    {children}
</div>
  )
}
