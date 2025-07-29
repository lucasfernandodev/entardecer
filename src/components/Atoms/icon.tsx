interface Icon{
  name: icons_type,
  className?: string
}

type icons_type =
  | 'help'
  | 'config'
  | 'github'
  | 'shortcut'
  | 'sun'
  | 'moom'
  | 'arrow_left'
  | 'dots'
  | 'chevron_left'
  | 'chevron_right'
  | 'bell'
  | 'close'
  | 'image'
  | 'update';

export default function Icon({ name, className}: Icon) {
  type _icons = {
    [key in icons_type]: string;
  };

  const icons: _icons = {
    help: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_97_1857)"><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11.3334V11.34" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.00008 9.00003C7.98781 8.78361 8.04619 8.56906 8.16643 8.3887C8.28667 8.20834 8.46226 8.07194 8.66675 8.00003C8.91733 7.9042 9.14225 7.75152 9.32379 7.554C9.50534 7.35648 9.63856 7.11951 9.71296 6.86175C9.78737 6.604 9.80092 6.33249 9.75257 6.06861C9.70421 5.80472 9.59526 5.55566 9.43429 5.34104C9.27332 5.12642 9.06473 4.95209 8.82494 4.83177C8.58515 4.71146 8.32071 4.64846 8.05243 4.64771C7.78415 4.64697 7.51936 4.70851 7.27891 4.82749C7.03846 4.94647 6.8289 5.11963 6.66675 5.33336" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_97_1857"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>',

    image: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="15" y1="8" x2="15.01" y2="8" /><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" /><path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" /></svg>',

    update: '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>',

    bell: '<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2.33333C5 1.97971 5.14048 1.64057 5.39052 1.39052C5.64057 1.14048 5.97971 1 6.33333 1C6.68696 1 7.02609 1.14048 7.27614 1.39052C7.52619 1.64057 7.66667 1.97971 7.66667 2.33333C8.43227 2.69535 9.08493 3.25888 9.5547 3.96353C10.0245 4.66818 10.2936 5.48738 10.3333 6.33333V8.33333C10.3835 8.7478 10.5303 9.14471 10.7619 9.49208C10.9935 9.83946 11.3034 10.1276 11.6667 10.3333H1C1.36329 10.1276 1.67321 9.83946 1.90479 9.49208C2.13638 9.14471 2.28316 8.7478 2.33333 8.33333V6.33333C2.37304 5.48738 2.6422 4.66818 3.11197 3.96353C3.58173 3.25888 4.23439 2.69535 5 2.33333" stroke="#D3D3DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.33331 10.3333V10.9999C4.33331 11.5304 4.54403 12.0391 4.9191 12.4141C5.29417 12.7892 5.80288 12.9999 6.33331 12.9999C6.86375 12.9999 7.37245 12.7892 7.74753 12.4141C8.1226 12.0391 8.33331 11.5304 8.33331 10.9999V10.3333" stroke="#D3D3DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    
    close: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L10.5 10.5M10.5 1L1 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',

    chevron_left:
      '<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2L2 8L8 14" stroke="#D3D3DF" stroke-opacity="0.35" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',

      chevron_right:
      '<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 14L8 8L2 2" stroke="#D3D3DF" stroke-opacity="0.35" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',

    config:
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_97_1853)"> <path d="M6.88333 2.878C7.16733 1.70733 8.83267 1.70733 9.11667 2.878C9.15928 3.05387 9.24281 3.21719 9.36047 3.35467C9.47813 3.49215 9.62659 3.5999 9.79377 3.66916C9.96094 3.73843 10.1421 3.76723 10.3225 3.75325C10.5029 3.73926 10.6775 3.68287 10.832 3.58867C11.8607 2.962 13.0387 4.13933 12.412 5.16867C12.3179 5.3231 12.2616 5.49756 12.2477 5.67785C12.2337 5.85814 12.2625 6.03918 12.3317 6.20625C12.4009 6.37333 12.5085 6.52172 12.6458 6.63937C12.7831 6.75702 12.9463 6.8406 13.122 6.88333C14.2927 7.16733 14.2927 8.83267 13.122 9.11667C12.9461 9.15928 12.7828 9.24281 12.6453 9.36047C12.5079 9.47813 12.4001 9.62659 12.3308 9.79377C12.2616 9.96094 12.2328 10.1421 12.2468 10.3225C12.2607 10.5029 12.3171 10.6775 12.4113 10.832C13.038 11.8607 11.8607 13.0387 10.8313 12.412C10.6769 12.3179 10.5024 12.2616 10.3222 12.2477C10.1419 12.2337 9.96082 12.2625 9.79375 12.3317C9.62667 12.4009 9.47828 12.5085 9.36063 12.6458C9.24298 12.7831 9.1594 12.9463 9.11667 13.122C8.83267 14.2927 7.16733 14.2927 6.88333 13.122C6.84072 12.9461 6.75719 12.7828 6.63953 12.6453C6.52187 12.5079 6.37341 12.4001 6.20623 12.3308C6.03906 12.2616 5.85789 12.2328 5.67748 12.2468C5.49706 12.2607 5.3225 12.3171 5.168 12.4113C4.13933 13.038 2.96133 11.8607 3.588 10.8313C3.68207 10.6769 3.73837 10.5024 3.75232 10.3222C3.76628 10.1419 3.7375 9.96082 3.66831 9.79375C3.59913 9.62667 3.49151 9.47828 3.35418 9.36063C3.21686 9.24298 3.05371 9.1594 2.878 9.11667C1.70733 8.83267 1.70733 7.16733 2.878 6.88333C3.05387 6.84072 3.21719 6.75719 3.35467 6.63953C3.49215 6.52187 3.5999 6.37341 3.66916 6.20623C3.73843 6.03906 3.76723 5.85789 3.75325 5.67748C3.73926 5.49706 3.68287 5.3225 3.58867 5.168C2.962 4.13933 4.13933 2.96133 5.16867 3.588C5.83533 3.99333 6.69933 3.63467 6.88333 2.878Z" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>  <defs> <clipPath id="clip0_97_1853"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>',

    github:
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5 11.6666C2.13333 12.6 2.13333 9.99997 1 9.66663M9 13V10.6666C9 9.99997 9.06667 9.7333 8.66667 9.3333C10.5333 9.1333 12.3333 8.39997 12.3333 5.3333C12.3325 4.53661 12.0217 3.77151 11.4667 3.19997C11.727 2.50794 11.703 1.74105 11.4 1.06663C11.4 1.06663 10.6667 0.866634 9.06667 1.9333C7.71149 1.58036 6.28851 1.58036 4.93333 1.9333C3.33333 0.866634 2.6 1.06663 2.6 1.06663C2.29699 1.74105 2.27302 2.50794 2.53333 3.19997C1.9783 3.77151 1.66748 4.53661 1.66667 5.3333C1.66667 8.39997 3.46667 9.1333 5.33333 9.3333C4.93333 9.7333 4.93333 10.1333 5 10.6666V13" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>',

    shortcut:
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_97_1935)"><path d="M5.99996 2.66663H3.33329C2.9651 2.66663 2.66663 2.9651 2.66663 3.33329V5.99996C2.66663 6.36815 2.9651 6.66663 3.33329 6.66663H5.99996C6.36815 6.66663 6.66663 6.36815 6.66663 5.99996V3.33329C6.66663 2.9651 6.36815 2.66663 5.99996 2.66663Z" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M5.99996 9.33325H3.33329C2.9651 9.33325 2.66663 9.63173 2.66663 9.99992V12.6666C2.66663 13.0348 2.9651 13.3333 3.33329 13.3333H5.99996C6.36815 13.3333 6.66663 13.0348 6.66663 12.6666V9.99992C6.66663 9.63173 6.36815 9.33325 5.99996 9.33325Z" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.6667 9.33325H10C9.63185 9.33325 9.33337 9.63173 9.33337 9.99992V12.6666C9.33337 13.0348 9.63185 13.3333 10 13.3333H12.6667C13.0349 13.3333 13.3334 13.0348 13.3334 12.6666V9.99992C13.3334 9.63173 13.0349 9.33325 12.6667 9.33325Z" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.33337 4.66663H13.3334" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11.3334 2.66663V6.66663" stroke="#D3D3DF" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs><clipPath id="clip0_97_1935"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>',

    sun: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99996 8.33317C7.73634 8.33317 8.33329 7.73622 8.33329 6.99984C8.33329 6.26346 7.73634 5.6665 6.99996 5.6665C6.26358 5.6665 5.66663 6.26346 5.66663 6.99984C5.66663 7.73622 6.26358 8.33317 6.99996 8.33317Z" stroke="#D3D3DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M1 7H3.66667M7 1V3.66667M10.3333 7H13M7 10.3333V13M4 4L4.66667 4.66667M10 4L9.33333 4.66667M9.33333 9.33333L10 10M4.66667 9.33333L4 10" stroke="#D3D3DF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    moom: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.99855 1.00533C7.08655 1.00533 7.17389 1.00533 7.26055 1.00533C6.40411 1.80114 5.85361 2.8719 5.70475 4.03148C5.55588 5.19107 5.81806 6.36615 6.44571 7.35249C7.07336 8.33882 8.0268 9.07403 9.14029 9.43031C10.2538 9.7866 11.4569 9.74143 12.5406 9.30267C12.1237 10.3057 11.4424 11.1767 10.5693 11.8228C9.69628 12.469 8.66418 12.866 7.58316 12.9716C6.50213 13.0772 5.41273 12.8873 4.43115 12.4223C3.44956 11.9572 2.61263 11.2345 2.00961 10.3311C1.4066 9.42767 1.06012 8.37752 1.00714 7.29265C0.954165 6.20777 1.19667 5.12886 1.7088 4.17101C2.22093 3.21315 2.98346 2.41228 3.91506 1.85382C4.84666 1.29536 5.91239 1.00026 6.99855 1V1.00533Z" stroke="white" stroke-width="1.5" stroke-linecap="round"stroke-linejoin="round"/></svg>',
    arrow_left:
      '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_105_694)"><path d="M3 4H13" stroke="#CDCFCF" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.33301 4L3.99967 6.66667" stroke="#CDCFCF" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.33301 4.00004L3.99967 1.33337" stroke="#CDCFCF" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs><clipPath id="clip0_105_694"><rect width="14" height="8" fill="white"/></clipPath></defs></svg>',

    dots: '<svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.4375 8.19352C3.8172 8.19352 4.125 7.87579 4.125 7.48385C4.125 7.0919 3.8172 6.77417 3.4375 6.77417C3.0578 6.77417 2.75 7.0919 2.75 7.48385C2.75 7.87579 3.0578 8.19352 3.4375 8.19352Z" fill="#D3D3DF" stroke="#D3D3DF" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.8125 8.19352C11.1922 8.19352 11.5 7.87579 11.5 7.48385C11.5 7.0919 11.1922 6.77417 10.8125 6.77417C10.4328 6.77417 10.125 7.0919 10.125 7.48385C10.125 7.87579 10.4328 8.19352 10.8125 8.19352Z" fill="#D3D3DF" stroke="#D3D3DF" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.1875 8.19352C18.5672 8.19352 18.875 7.87579 18.875 7.48385C18.875 7.0919 18.5672 6.77417 18.1875 6.77417C17.8078 6.77417 17.5 7.0919 17.5 7.48385C17.5 7.87579 17.8078 8.19352 18.1875 8.19352Z" fill="#D3D3DF" stroke="#D3D3DF" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  return (
    <span
    className={className}
      key={name}
      dangerouslySetInnerHTML={{
        __html: icons[name] || `${name}: Icon not found!`,
      }}
    ></span>
  );
}
