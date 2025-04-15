import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class SightengineService {
  private readonly apiUser = '1500343726'; // replace with your actual
  private readonly apiSecret = '6d252ScAATUCK4mnVK64RUJCSoJNKMkP'; // replace with your actual

  async moderateImage(filePath: string): Promise<any> {
    const form = new FormData();
    form.append('media', fs.createReadStream(filePath));
    form.append('models', 'nudity,wad,offensive,gore');
    form.append('api_user', this.apiUser);
    form.append('api_secret', this.apiSecret);

    try {
      const response = await axios.post(
        'https://api.sightengine.com/1.0/check.json',
        form,
        { headers: form.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Sightengine error:', error.response?.data || error.message);
      throw new Error('Image moderation failed');
    }
  }
}
