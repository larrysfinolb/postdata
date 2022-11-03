import { Button, Modal } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import supabase from 'utils/supabase';

type Props = {
  children: React.ReactNode;
};

function AdminAuth({ children }: Props) {
  const [session, setSession] = React.useState(null);
  const [opened, setOpened] = React.useState(true);
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    const getSession = async () => {
      try {
        type Result = {
          data: any;
          error: any;
        };
        const {
          data: { session },
          error,
        }: Result = await supabase.auth.getSession();

        if (error) throw error;
        if (session?.user.id !== '9feda9d6-0cec-4daf-9ce9-10d471104398') {
          const { error: errorSignOut } = await supabase.auth.signOut();
          if (errorSignOut) throw errorSignOut;
        }

        setSession(session);
        setLoader(false);
      } catch (error) {
        console.error(error);
      }
    };

    getSession();
  }, []);

  return (
    <>
      {!session && !loader && (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          closeOnClickOutside={false}
          closeOnEscape={false}
          withCloseButton={false}
          title='Tú no tienes acceso a esta area.'>
          <Link href='/admin'>
            <Button color='green' variant='outline' fullWidth component='a'>
              Ir al login.
            </Button>
          </Link>
        </Modal>
      )}
      {session && children}
    </>
  );
}

export default AdminAuth;
