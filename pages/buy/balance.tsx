import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import supabase from 'utils/supabase';
import { Text, Button, Stack, NumberInput } from '@mantine/core';
import styled from '@emotion/styled';
import colors from 'utils/colors';
import FileInput from 'components/FileInput';

const BsToPDX = 3;

const ColoredText = styled.span`
  color: ${colors.green};
`;
const StyledContainer = styled.div`
  border: 1px solid #000;
  margin: auto;
  width: 500px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 6px;
`;

type Props = {};

function Balance({}: Props) {
  const router = useRouter();
  const [balance, setBalance] = React.useState<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      error && router.push('/login');
    };
    getUser();
  }, []);

  const handleChange = (e: any) => {
    setBalance(e * BsToPDX);
  };

  return (
    <Layout Header={<Header />}>
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Comprar saldo
      </Heading>
      <Text align="center" weight="bold" color="dark" size={18} mt={35}>
        ¿Cuanto saldo quieres comprar?, elige la cantidad y envia la imagen de
        la transferencia, el saldo se reflejara en el transcurso de 24 horas.
      </Text>
      <StyledContainer>
        <Stack>
          <NumberInput
            label="Saldo (PDX) a comprar"
            precision={2}
            min={0}
            defaultValue={0}
            onChange={(e) => handleChange(e)}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value: any) =>
              !Number.isNaN(parseFloat(value))
                ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '$ '
            }
          />
          <NumberInput
            label="Cantidad a pagar en bolivares"
            readOnly
            hideControls
            precision={2}
            min={0}
            defaultValue={0}
            value={balance}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            formatter={(value: any) =>
              !Number.isNaN(parseFloat(value))
                ? `Bs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : 'Bs. '
            }
          />
          <FileInput
            label="Transferencia"
            placeholder="Selecciona una imagen"
            title="Imagen de la transferencia"
            isBuying
          />
          <Button fullWidth style={{ backgroundColor: '#FCB84C' }}>
            Comprar
          </Button>
        </Stack>
      </StyledContainer>
    </Layout>
  );
}

export default Balance;
