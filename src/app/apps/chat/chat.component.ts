import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatGptService } from 'src/app/libs/services/chatgpt.service';

class Message {
  text?: string;
  type: MessageType;
}

enum MessageType {
  Bot = 'bot',
  User = 'user',
  Loading = 'loading',
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer: ElementRef;
  @Input() public display: string;

  public form!: FormGroup;
  public messages: Array<Message> = [];
  private canSendMessage = true;

  constructor(
    private formBuilder: FormBuilder,
    private chatGptService: ChatGptService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message: [''],
    });
    this.getBotMessage();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  public onClickSendMessage(): void {
    const message = this.form.get('message')?.value;

    if (message && this.canSendMessage) {
      const userMessage: Message = { text: message, type: MessageType.User };
      this.messages.push(userMessage);

      this.form.get('message')?.setValue('');
      this.form.updateValueAndValidity();
      this.sendMessageToBot(message);
    }
  }

  private getBotMessage(): void {
    this.canSendMessage = false;
    const waitMessage: Message = { type: MessageType.Loading };
    this.messages.push(waitMessage);

    setTimeout(() => {
      this.messages.pop();
      const botMessage: Message = {
        text: 'Hello! How can I help you?',
        type: MessageType.Bot,
      };
      this.messages.push(botMessage);
      this.canSendMessage = true;
    }, 2000);
  }

  private sendMessageToBot(message: string): void {
    this.canSendMessage = false;

    this.chatGptService.chatBot({ message }).subscribe(
      (response) => {
        const botMessage: Message = {
          text: response.response,
          type: MessageType.Bot,
        };
        this.messages.push(botMessage);
        this.canSendMessage = true;
      },
      (error) => {
        console.error('Error sending message to bot:', error);
        this.canSendMessage = true;
      }
    );
  }

  public onClickEnter(event: any): void {
    event.preventDefault();
    this.onClickSendMessage();
  }

  private scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop =
      this.messageContainer.nativeElement.scrollHeight;
  }
}
