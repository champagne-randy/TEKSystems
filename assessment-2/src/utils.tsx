import { Room, RoomRequests, Vacancies } from "./interfaces";
import { range } from "lodash";

export const Validate = {
  prop: {
    greaterThanZero(props: any, propName: any, _componentName: any) {
      const componentName = _componentName || "ANONYMOUS";
      if (props[propName]) {
        let value = props[propName];
        if (typeof value === "number") {
          return value > 0
            ? null
            : new Error(
                `${propName} in ${componentName} must be greater than 0: ${value}"`
              );
        }
      }
      return null;
    },
    instanceOfSet(props: any, propName: any, _componentName: any) {
      const componentName = _componentName || "ANONYMOUS";
      if (props[propName]) {
        let value = props[propName];
        return value instanceof Set
          ? null
          : new Error(
              `${propName} in ${componentName} must be instanceof Set()"`
            );
      }
    }
  },
  input: {
    isValidRoomRequest({ requests }: { requests: RoomRequests }) {
      return requests.adult.value > 0 || requests.child.value > 0;
    }
  },
  isRoomReqFormValid({ rooms }: { rooms: Room[] }) {
    return rooms
      .filter(room => room.isActive)
      .reduce((isValid, room) => isValid && room.requests.isValid, true);
  }
};

export function getDDOptsFromVacancies({
  vacancies
}: {
  vacancies: Vacancies;
}) {
  return {
    adult: range(1, vacancies.adult + 1).map(val => ({
      label: `${val}`,
      value: `${val}`
    })),
    child: range(0, vacancies.child + 1).map(val => ({
      label: `${val}`,
      value: `${val}`
    }))
  };
}
