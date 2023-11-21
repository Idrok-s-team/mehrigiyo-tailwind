import { FC } from 'react'

type Props = {
  color?: string
  width?: string | number
  height?: string | number
}

export const ArrowRightIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none">
      <path
        stroke="#53B175"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.875}
        d="m10.938 4.177 5.624 5.625m0 0-5.625 5.625m5.626-5.625H1"
      />
    </svg>
  )
}

export const PlusWhiteIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.335 9C17.335 9.37583 17.1908 9.73913 16.9214 10.0022C16.6582 10.2716 16.2948 10.4219 15.9188 10.4219H10.2542V16.0844C10.2542 16.4602 10.1039 16.8235 9.83441 17.0866C9.57123 17.3497 9.21406 17.5 8.83809 17.5C8.46213 17.5 8.09869 17.3497 7.83551 17.0866C7.56607 16.8235 7.41568 16.4602 7.41568 16.0844V10.4219H1.75111C1.37514 10.4219 1.0117 10.2716 0.748525 10.0022C0.485348 9.73913 0.334961 9.37583 0.334961 9C0.334961 8.62417 0.485348 8.26713 0.748525 7.99779C1.0117 7.73471 1.37514 7.58438 1.75111 7.58438H7.41568V1.92189C7.41568 1.54606 7.56607 1.18276 7.83551 0.919676C8.09869 0.650332 8.46213 0.5 8.83809 0.5C9.21406 0.5 9.57123 0.650332 9.83441 0.919676C10.1039 1.18276 10.2542 1.54606 10.2542 1.92189V7.58438H15.9188C16.2948 7.58438 16.6582 7.73471 16.9214 7.99779C17.1908 8.26713 17.335 8.62417 17.335 9Z"
        fill="white"
      />
    </svg>
  )
}

export const ArrowRightGrayIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.47503 4.16676C8.59952 4.16634 8.72253 4.19381 8.83501 4.24717C8.9475 4.30053 9.04659 4.37841 9.12503 4.4751L13.15 9.47509C13.2726 9.62421 13.3396 9.81124 13.3396 10.0043C13.3396 10.1973 13.2726 10.3843 13.15 10.5334L8.98336 15.5334C8.84191 15.7036 8.63865 15.8106 8.4183 15.8309C8.19794 15.8513 7.97854 15.7832 7.80836 15.6418C7.63818 15.5003 7.53116 15.2971 7.51084 15.0767C7.49053 14.8563 7.55858 14.6369 7.70003 14.4668L11.425 10.0001L7.82503 5.53343C7.72313 5.41111 7.65839 5.26216 7.63849 5.1042C7.61859 4.94624 7.64436 4.78589 7.71274 4.64212C7.78112 4.49834 7.88925 4.37717 8.02434 4.29292C8.15944 4.20868 8.31583 4.1649 8.47503 4.16676Z"
        fill="#BDBDBD"
      />
    </svg>
  )
}

export const ArrowRightLongerGreenIcon = () => {
  return (
    <svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.1553 7.03033C24.4482 6.73744 24.4482 6.26256 24.1553 5.96967L19.3824 1.1967C19.0895 0.903806 18.6146 0.903806 18.3217 1.1967C18.0288 1.48959 18.0288 1.96447 18.3217 2.25736L22.5643 6.5L18.3217 10.7426C18.0288 11.0355 18.0288 11.5104 18.3217 11.8033C18.6146 12.0962 19.0895 12.0962 19.3824 11.8033L24.1553 7.03033ZM0 7.25H23.625V5.75H0V7.25Z"
        fill="#53B175"
      />
    </svg>
  )
}

export const CloseRoundIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#F0F0F0" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.9651 24.6932C25.9738 24.4569 25.8863 24.2298 25.7288 24.0572L22.2191 20.4049L21.3963 19.5599L25.7288 15.0627C25.8163 14.9718 25.8863 14.8719 25.9301 14.7629C25.9738 14.6538 26.0001 14.5357 26.0001 14.4176C26.0001 14.2904 25.9826 14.1723 25.9301 14.0633C25.8863 13.9543 25.825 13.8452 25.7463 13.7635C25.6587 13.6817 25.5625 13.609 25.4574 13.5636C25.3524 13.5182 25.2299 13.5 25.1161 13.5C25.0023 13.5 24.8885 13.5273 24.7748 13.5727C24.6697 13.6181 24.5735 13.6908 24.4947 13.7726L20.0131 18.4246L15.5054 13.7454C15.3391 13.5819 15.1203 13.5001 14.8927 13.5001C14.6652 13.5001 14.4464 13.6 14.2888 13.7636C14.1225 13.9362 14.035 14.1542 14.035 14.3904C14.0263 14.6267 14.1138 14.8538 14.2713 15.0264L17.781 18.6787L18.6038 19.5237L14.2713 24.0209C14.1838 24.1118 14.1138 24.2117 14.07 24.3207C14.0263 24.4298 14 24.5479 14 24.666C14 24.7932 14.0175 24.9113 14.07 25.0203C14.1138 25.1293 14.175 25.2384 14.2538 25.3201C14.3413 25.4019 14.4376 25.4746 14.5426 25.52C14.6477 25.5654 14.7702 25.5836 14.884 25.5836C14.9978 25.5836 15.1116 25.5564 15.2253 25.5109C15.3304 25.4655 15.4266 25.3928 15.5054 25.3111L19.987 20.659L24.4947 25.3382C24.661 25.5018 24.8798 25.5835 25.1073 25.5835C25.3349 25.5835 25.5537 25.4836 25.7113 25.3201C25.8776 25.1474 25.9651 24.9294 25.9651 24.6932Z"
        fill="#181725"
      />
    </svg>
  )
}

export const DropdownIcon: FC<Props> = ({ width = 12, height = 12 }) => (
  <svg
    width={width}
    height={height}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
  </svg>
)

export const ContactSendIcon: FC<Props> = ({ width = 12, height = 12 }) => (
  <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.3622 9.81969C20.4747 9.77152 20.5705 9.69141 20.6379 9.58928C20.7053 9.48716 20.7412 9.36751 20.7412 9.24517C20.7412 9.12283 20.7053 9.00317 20.6379 8.90105C20.5705 8.79892 20.4747 8.71881 20.3622 8.67064L2.36106 0.956106L2.36017 0.955222L1.80156 0.714806C1.69571 0.669321 1.57934 0.653979 1.46532 0.670476C1.35129 0.686973 1.24405 0.734667 1.15543 0.808288C1.06681 0.88191 1.00026 0.978594 0.963138 1.08766C0.926018 1.19673 0.919767 1.31393 0.945076 1.42633L1.07766 2.01853L1.07677 2.02119L2.68279 9.24517L1.07677 16.4691L1.07677 16.4727L0.944191 17.0649C0.919288 17.1772 0.925844 17.2941 0.963139 17.4029C1.00043 17.5117 1.06702 17.6081 1.15557 17.6815C1.24411 17.7548 1.35119 17.8024 1.46501 17.8188C1.57883 17.8352 1.69498 17.82 1.80067 17.7746L20.3622 9.81969ZM17.0715 9.87007L3.82388 9.87007L3.9326 9.38128C3.9526 9.29164 3.9526 9.19869 3.9326 9.10905L3.82388 8.62026L17.0715 8.62026L18.5291 9.24517L17.0724 9.87096L17.0715 9.87007Z"
      fill="#53B175"
    />
  </svg>
)
