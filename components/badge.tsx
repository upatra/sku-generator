export default function Badge(props: any) {
  const removeThisBadge = () => {
    props.removeMe(props.array, props.id)
  }
  return (
    <>
      <span className="inline-flex rounded-full items-center mr-1.5 py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
        {props.name}
        {props.name && props.code && <span>&nbsp;|&nbsp;</span>}
        {props.code}
        <button
          type="button"
          className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
          onClick={removeThisBadge}
        >
          <span className="sr-only">Remove option</span>
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </span>
    </>
  )
}
