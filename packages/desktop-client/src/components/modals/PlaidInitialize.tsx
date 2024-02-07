// @ts-strict-ignore
import React, { useState } from 'react';

import { send } from 'loot-core/src/platform/client/fetch';

import { Error } from '../alerts';
import { ButtonWithLoading } from '../common/Button';
import { ExternalLink } from '../common/ExternalLink';
import { Input } from '../common/Input';
import { Modal, ModalButtons } from '../common/Modal';
import type { ModalProps } from '../common/Modal';
import { Text } from '../common/Text';
import { View } from '../common/View';
import { FormField, FormLabel } from '../forms';

import { usePlaidLink } from 'react-plaid-link';

type PlaidInitialiseProps = {
  modalProps?: Partial<ModalProps>;
  onSuccess: () => void;
};

export const PlaidInitialize = ({
  modalProps,
  onSuccess,
}: PlaidInitialiseProps) => {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { open, ready } = usePlaidLink({
    token: '<GENERATED_LINK_TOKEN>',
    onSuccess: (public_token, metadata) => {
      // send public_token to server
    },
  });

  return (
    <Modal title="Set-up Plaid" size={{ width: 300 }} {...modalProps}>
      <View style={{ display: 'flex', gap: 10 }}>
        <Text>
          In order to enable bank-sync via Plaid (only for North American
          banks) you will need to create a token via Plaid Link.
        </Text>
      </View>

      <ModalButtons>
        <ButtonWithLoading
          type="primary"
          loading={isLoading}
          onClick={() => open()}
        >
          Open Plaid Link
        </ButtonWithLoading>
      </ModalButtons>
    </Modal>
  );
};
