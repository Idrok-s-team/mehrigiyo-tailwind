import Link from 'next/link'

type BreadcrumbItem = {
  text: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-[#505050]">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1
          return (
            <li
              key={index}
              className={`flex items-center text-sm text-[#505050] ${!isLastItem && 'after:content-["/"] after:mx-2'}`}
            >
              {isLastItem ? (
                <span className="text-green-primary">{item.text}</span>
              ) : (
                <Link href={item.href as string} className="duration-200 hover:text-black">
                  {item.text}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
