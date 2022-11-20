import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import supabase from 'utils/supabase';
import { Text, Button, Stack, NumberInput } from '@mantine/core';
import styled from '@emotion/styled';
import colors from 'utils/colors';
import { useForm } from '@mantine/form';
import { FileInput } from '@mantine/core';

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
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      error && router.push('/login');
      setUser(data);
      console.log(data);
    };
    getUser();
  }, []);

  const handleChange = (e: any) => {
    const number = Number(e.target.value.split(' ')[1]);
    console.log(number);
    setBalance(number * BsToPDX);
  };

  const form = useForm({
    initialValues: {
      payment_file: {},
    },
  });

  return (
    <Layout Header={<Header />}>
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Comprar saldo
      </Heading>
      <Text align="center" weight="bold" color="dark" size={18} mt={35}>
        ¿Cuanto saldo quieres comprar?, elige la cantidad y envia la imagen de
        la transferencia, el saldo se reflejara en el transcurso de 24 horas.
        <br />
        Si el saldo no se ha reflejado en el transcurso de 72 horas
        probablemente se haya rechazado.
        <br />
        Número de cuenta: 02374826732533951051
      </Text>
      <StyledContainer>
        <form
          onSubmit={form.onSubmit(async ({ payment_file }: any) => {
            const fileName = `${payment_file.name}`
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            const resultImage = await supabase.storage
              .from('payments')
              .upload(fileName, payment_file, { upsert: true });
            if (resultImage.error) {
              alert(resultImage.error.message);
              throw resultImage.error.message;
            } else {
              const urlPayment = supabase.storage
                .from('payments')
                .getPublicUrl(resultImage.data.path);

              const { data: clients, error: clientsError } = await supabase
                .from('clients')
                .select('id')
                .eq('email', user.email);

              if (!clientsError) {
                const { data, error } = await supabase.from('payments').insert([
                  {
                    clients_id: clients[0],
                    amount: balance,
                    voucher_url: urlPayment,
                  },
                ]);

                if (!error) {
                  router.push('/payment-validate');
                }
              }
            }
          })}
        >
          <Stack>
            <NumberInput
              label="Saldo (PDX) a comprar"
              precision={2}
              min={0}
              defaultValue={0}
              onChange={(e) => handleChange(e)}
              onInput={(e) => handleChange(e)}
              onClick={(e) => handleChange(e)}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              {...form.getInputProps('amount')}
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
              {...form.getInputProps('payment_file')}
              withAsterisk
              required
            />
            <Button
              type="submit"
              fullWidth
              style={{ backgroundColor: '#FCB84C' }}
            >
              Comprar
            </Button>
          </Stack>
        </form>
      </StyledContainer>
    </Layout>
  );
}

export default Balance;
