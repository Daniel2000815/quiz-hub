import { Badge } from "@nextui-org/react";

export function MainBadge(props: { name: string }) {
  return (
    <Badge variant="flat" color="primary">
      {props.name}
    </Badge>
  );
}

export function LanguageBadge(props: { language: string }) {
  return (
    <Badge variant="flat" color="secondary">
      {props.language}
    </Badge>
  );
}
