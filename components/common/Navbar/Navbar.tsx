import { Container } from "@components/UI";
import { FC } from "react";
import Link from "next/link";
import style from "./Navbar.module.css";
import { Usernav } from "@components/common";

const Navbar: FC = () => {
  return (
    <Container>
      <div className={style.root}>
        <div className="flex flex-1 items-center">
          <Link legacyBehavior href="/">
            <a className={style.logo}>SHOP</a>
          </Link>
          <nav className="ml-6 space-x-6">
            <Link legacyBehavior href="/">
              <a className={style.link}>All</a>
            </Link>
            <Link legacyBehavior href="/">
              <a className={style.link}>Clothes</a>
            </Link>
            <Link legacyBehavior href="/">
              <a className={style.link}>Accesories</a>
            </Link>
            <Link legacyBehavior href="/">
              <a className={style.link}>Shoes</a>
            </Link>
          </nav>
          <div className="flex flex-1 justify-end space-x-8">
            <Usernav />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
