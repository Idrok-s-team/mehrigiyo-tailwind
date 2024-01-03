import React from 'react'
import Link from 'next/link'

interface TopNavLink {
  text: string
  href: string
}

interface TopNavLinksProps {
  titles: TopNavLink[]
}

const TopNavLinks: React.FC<TopNavLinksProps> = ({ titles }) => (
  <ul className="flex gap-5">
    {titles.map(({ text, href }) => (
      <Link href={href} key={text}>
        {text}
      </Link>
    ))}
  </ul>
)

export default TopNavLinks
