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
      <ol className="flex leading-none text-[#505050] max-md:flex-wrap">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1
          return (
            <li
              key={index}
              className={`flex items-center text-sm text-[#505050] ${!isLastItem && 'after:content-["/"] after:mx-1'}`}
            >
              {isLastItem ? (
                <span className="text-green-primary">{item.text}</span>
              ) : (
                <Link
                  href={item.href as string}
                  className="duration-200 hover:bg-green-light hover:text-green-primary px-1"
                >
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
