import {
  Dialog,
  Title,
  Button,
  Bar,
  BusyIndicator,
  MessageBox,
  FlexBox,
} from '@ui5/webcomponents-react';
import { ReactNode, ReactElement } from 'react';

interface TemplatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  error?: string | null;
  onErrorClose?: () => void;
  isLoading?: boolean;
  footer?: ReactElement;
  width?: string;
}

export default function TemplatePopup({
  isOpen,
  onClose,
  title,
  children,
  error,
  onErrorClose,
  isLoading = false,
  footer,
}: TemplatePopupProps) {
  return (
    <Dialog
      open={isOpen}
      header={
        <Bar>
          <Title>{title}</Title>
          <Button icon="decline" design="Transparent" onClick={onClose}/>
        </Bar>
      }
      onClose={onClose}
      style={{ width: '500px' }}
      footer={
        <FlexBox
            gap="0.5rem"
            style={{ padding: '0.5rem'}}>
            {footer}
        </FlexBox>
    }
    >
      <div style={{ padding: '0.5rem' }}>
        {error && (
          <MessageBox
            type="Error"
            actions={["OK"]}
            onClose={onErrorClose}
            style={{ marginBottom: '1rem' }}
          >
            {error}
          </MessageBox>
        )}
        {isLoading ? (
          <BusyIndicator active={isLoading} size="M" style={{ margin: "2rem auto", display: "block" }} />
        ) : (
          children
        )}
      </div>
    </Dialog>
  );
} 