import Image from "next/image";
import { trophies } from "@/lib/trophies";

function TrophyGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="trophy-belt__group" aria-hidden={hidden}>
      {trophies.map((trophy) => (
        <li
          key={trophy.id}
          className={`trophy-belt__item${trophy.id === "world-cup" ? " trophy-belt__item--world-cup" : ""}`}
        >
          <Image
            src={trophy.image}
            alt={hidden ? "" : trophy.label}
            width={200}
            height={200}
            className={`trophy-belt__image${trophy.id === "world-cup" ? " trophy-belt__image--world-cup" : ""}`}
            draggable={false}
          />
        </li>
      ))}
    </ul>
  );
}

export function TrophyBelt() {
  return (
    <section
      id="trofeos"
      aria-label="Trofeos de Lamine Yamal"
      className="trophy-belt"
    >
      <div className="trophy-belt__stripe trophy-belt__stripe--blue" aria-hidden />
      <div className="trophy-belt__body">
        <div className="trophy-belt__track">
          <div className="trophy-belt__marquee">
            <TrophyGroup />
            <TrophyGroup hidden />
          </div>
        </div>
      </div>
      <div className="trophy-belt__stripe trophy-belt__stripe--red" aria-hidden />
    </section>
  );
}
