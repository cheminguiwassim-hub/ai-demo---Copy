import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from './ai.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userPrompt = '';
  aiResponse = '';

  constructor(private ai: AiService) {}

  async send() {
    this.aiResponse = 'Thinking...';
    //this.aiResponse = await this.ai.sendMessage(this.userPrompt);

  }
}
