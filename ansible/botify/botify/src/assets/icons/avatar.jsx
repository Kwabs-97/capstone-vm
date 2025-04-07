function Avatar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <circle cx="20" cy="20" r="20" fill="#C7D2FE" />
      <mask
        id="mask0_1264_25821"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <circle cx="20" cy="20" r="20" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_1264_25821)">
        <ellipse cx="19.9999" cy="35.2" rx="15.2" ry="8.8" fill="#4F46E5" />
      </g>
      <circle cx="19.9999" cy="17" r="7.2" fill="#4F46E5" />
    </svg>
  );
}

export default Avatar;
