import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { AiFillGithub } from "react-icons/ai";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
export default function Project(props: { item: Project; key: number }) {
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card
        shadow="sm"
        key={props.key}
        isPressable
        isHoverable
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onPress={onOpen}
      >
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={props.item.title}
            className="w-full object-cover h-[140px]"
            src={isMouseOver ? props.item.anim : props.item.cover}
          />
        </CardBody>
        <CardFooter isBlurred className="text-small justify-between">
          <b>{props.item.title}</b>
          {/* {props.item.badges.map((badge) => ({ badge }))} */}
        </CardFooter>
      </Card>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="2xl"
        scrollscrollBehavior="inside"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-2">
                {props.item.title}
              </ModalHeader>

              <ModalBody>
                <div className="flex gap-2">{props.item.description}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button
                  as={Link}
                  className="bg-[#AAAAAA] shadow-lg shadow-indigo-500/20"
                  isBlock
                  href={props.item.link}
                  endContent={<AiFillGithub />}
                >
                  Visit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
