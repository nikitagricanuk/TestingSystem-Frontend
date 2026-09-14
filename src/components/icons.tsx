import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(children: React.ReactNode, props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return base(
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>,
    props,
  );
}

export function StarIcon(props: IconProps) {
  return base(
    <path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />,
    props,
  );
}

export function HistoryIcon(props: IconProps) {
  return base(
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4l3 2" />
    </>,
    props,
  );
}

export function ChecklistIcon(props: IconProps) {
  return base(
    <>
      <path d="M9 6h11" />
      <path d="M9 12h11" />
      <path d="M9 18h11" />
      <path d="M4 6l1 1 2-2" />
      <path d="M4 12l1 1 2-2" />
      <path d="M4 18l1 1 2-2" />
    </>,
    props,
  );
}

export function ListIcon(props: IconProps) {
  return base(
    <>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </>,
    props,
  );
}

export function PersonIcon(props: IconProps) {
  return base(
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.3-3.5 4.2-5.5 7.5-5.5s6.2 2 7.5 5.5" />
    </>,
    props,
  );
}

export function GlobeIcon(props: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.3 3.6 5.3 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.3-3.6-8.5S9.6 5.8 12 3.5z" />
    </>,
    props,
  );
}

export function CalendarIcon(props: IconProps) {
  return base(
    <>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3" />
      <path d="M16 3v3" />
    </>,
    props,
  );
}

export function GearIcon(props: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.5-2-3.4-2.4 1a7.7 7.7 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.9 7.9 0 0 0 0 2l-2 1.5 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4z" />
    </>,
    props,
  );
}

export function LogoutIcon(props: IconProps) {
  return base(
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>,
    props,
  );
}

export function OverviewIcon(props: IconProps) {
  return GridIcon(props);
}

export function PeopleIcon(props: IconProps) {
  return base(
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 19c1.1-3 3.5-4.8 6.5-4.8s5.4 1.8 6.5 4.8" />
      <circle cx="17.5" cy="8.5" r="2.3" />
      <path d="M15 14.5c2.2.2 4 1.6 4.9 4.5" />
    </>,
    props,
  );
}

export function AnalyticsIcon(props: IconProps) {
  return base(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.3 16.3L21 21" />
    </>,
    props,
  );
}

export function CertificateIcon(props: IconProps) {
  return base(
    <>
      <rect x="4" y="4" width="16" height="12" rx="1.5" />
      <path d="M8 20l4-2 4 2" />
      <path d="M7.5 8h9" />
      <path d="M7.5 11.5h6" />
    </>,
    props,
  );
}
