import { NavLink } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { SlPeople } from 'react-icons/sl';
import { AiOutlineFileSearch, AiOutlineFileAdd } from 'react-icons/ai';
import { useAppContext } from '../context/appContext';
import { translations } from '../data';

export const NavLinksComponent = ({ toggleSidebar }) => {
  const { user, local, isEditing } = useAppContext();

  const linksData = [
    {
      id: 1,
      text: translations[local].profileTitle,
      path: 'profile',
      icon: <CgProfile />,
    },
    {
      id: 2,
      text: translations[local].searchWordsTitle,
      path: '/',
      icon: <AiOutlineFileSearch />,
    },
    {
      id: 3,
      text: isEditing
        ? translations[local].editWordTitle
        : translations[local].createWordTitle,
      path: 'word',
      icon: <AiOutlineFileAdd />,
    },
    {
      id: 4,
      text: translations[local].aboutTitle,
      path: 'about',
      icon: <SlPeople />,
    },
  ];

  return (
    <div className="nav-links">
      {linksData
        .filter((singleLink) =>
          user.role === 'admin' ? singleLink : singleLink.id !== 3
        )
        .map((link) => {
          const { text, path, id, icon } = link;

          return (
            <NavLink
              to={path}
              key={id}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
    </div>
  );
};
