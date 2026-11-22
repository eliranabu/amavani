import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
  "aria-hidden": true, focusable: false,
} as const;

export const IconSearch = (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>);
export const IconBag = (p: P) => (<svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.5a3 3 0 016 0V8" /></svg>);
export const IconUser = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" /></svg>);
export const IconMenu = (p: P) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>);
export const IconClose = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
/* בעברית "קדימה" הוא שמאלה */
export const IconArrow = (p: P) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>);
export const IconChevron = (p: P) => (<svg {...base} {...p}><path d="M15 6l-6 6 6 6" /></svg>);
export const IconPlus = (p: P) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const IconCheck = (p: P) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const IconTruck = (p: P) => (<svg {...base} {...p}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.5" /><circle cx="17" cy="17.5" r="1.5" /></svg>);
export const IconReturn = (p: P) => (<svg {...base} {...p}><path d="M9 14L4 9l5-5" /><path d="M4 9h10a6 6 0 010 12h-3" /></svg>);
export const IconHeart = (p: P) => (<svg {...base} {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" /></svg>);
export const IconShield = (p: P) => (<svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>);
export const IconLock = (p: P) => (<svg {...base} {...p}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>);
export const IconExternal = (p: P) => (<svg {...base} {...p}><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></svg>);
export const IconStore = (p: P) => (<svg {...base} {...p}><path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9a2.7 2.7 0 005.3 0 2.7 2.7 0 005.4 0A2.7 2.7 0 0020 9" /><path d="M10 20v-5h4v5" /></svg>);
export const IconFilter = (p: P) => (<svg {...base} {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>);
export const IconAlert = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg>);
export const IconChat = (p: P) => (<svg {...base} {...p}><path d="M4 18.5V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 2.5z" /></svg>);
export const IconGift = (p: P) => (<svg {...base} {...p}><rect x="4" y="9" width="16" height="11" rx="1" /><path d="M3 9h18M12 9v11M12 9c-2-4-6-4-6-1.5S12 9 12 9zm0 0c2-4 6-4 6-1.5S12 9 12 9z" /></svg>);
export const IconHeartFill = (p: P) => (<svg {...base} fill="currentColor" {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" /></svg>);
export const IconShare = (p: P) => (<svg {...base} {...p}><circle cx="17" cy="5.5" r="2.5" /><circle cx="17" cy="18.5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><path d="M8.2 10.8l6.6-4M8.2 13.2l6.6 4" /></svg>);
export const IconAccess = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="4.5" r="1.8" /><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5M12 14.5L9 21M12 14.5l3 6.5" /></svg>);
export const IconRuler = (p: P) => (<svg {...base} {...p}><rect x="3" y="8" width="18" height="8" rx="1" /><path d="M7 8v3M11 8v4M15 8v3M19 8v4" /></svg>);
export const IconBell = (p: P) => (<svg {...base} {...p}><path d="M6 16V11a6 6 0 0112 0v5l1.5 2h-15L6 16zM10 20a2 2 0 004 0" /></svg>);
export const IconWhatsApp = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>);
