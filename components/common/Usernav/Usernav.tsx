import { FC } from "react";
import style from "./Usernav.module.css";
import Link from "next/link";
import { Bag as Cart, Heart } from "@components/icons";
import { useUI } from "@components/UI/context";

const Usernav: FC = () => {
  const ui = useUI();

  return (
    <nav>
      <ul className={style.list}>
        <li className={style.item}>
          <Cart onClick={ui.setSidebarOpen} />
        </li>
        <li className={style.item}>
          <Link legacyBehavior href="/wishlist">
            <a>
              <Heart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Usernav;
