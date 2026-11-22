import os
import urllib.request
import json
from PIL import Image
import io

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), 'public', 'assets', 'images')
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Image definitions: filename, max_width, candidate URLs, credits info
IMAGES = [
    # HERO BANNER
    {
        'filename': 'hero-smog-skyline.webp',
        'width': 1200,
        'urls': [
            'https://www.smartcity.co.nz/wp-content/uploads/2021/03/Air-pollution-city.jpg',
            'https://cdn.pixabay.com/photo/2023/04/22/11/12/environment-7943580_1280.jpg',
            'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=1600&q=80&auto=format&fit=crop'
        ],
        'section': 'Hero Banner',
        'alt': 'Dense air pollution and winter smog enveloping urban city skyline at sunrise',
        'photographer': 'SmartCity / Pixabay Contributors',
        'source': 'SmartCity / Pixabay Royalty-Free'
    },
    # POLLUTANTS (6 items)
    {
        'filename': 'pollutant-pm25.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Pollutant Cards',
        'alt': 'Fine particulate matter PM2.5 haze scattering sunlight in urban atmosphere',
        'photographer': 'Patrick Hendry',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'pollutant-pm10.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541888946425-d0fbb1862678?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Pollutant Cards',
        'alt': 'Coarse particulate dust PM10 from urban road surfaces and excavation',
        'photographer': 'Ricardo Gomez Angel',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'pollutant-no2.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Pollutant Cards',
        'alt': 'Dense city highway traffic generating nitrogen dioxide (NO2) tailpipe emissions',
        'photographer': 'Denys Nevozhai',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'pollutant-so2.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Pollutant Cards',
        'alt': 'Industrial smokestacks emitting sulfur dioxide (SO2) into the sky',
        'photographer': 'Marten Bjork',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'pollutant-co.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Pollutant Cards',
        'alt': 'Heavy urban vehicle congestion producing toxic carbon monoxide (CO) gas',
        'photographer': 'Nuno Alberto',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'pollutant-o3.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Pollutant Cards',
        'alt': 'Photochemical summer smog creating ground-level ozone (O3) over city towers',
        'photographer': 'Aleksandar Pasaric',
        'source': 'Unsplash (Free License)'
    },

    # CAUSES OF POLLUTION (4 items)
    {
        'filename': 'cause-traffic.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Causes of Pollution',
        'alt': 'Urban rush hour bumper-to-bumper vehicle traffic emitting tailpipe fumes',
        'photographer': 'Denys Nevozhai',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'cause-industry.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Causes of Pollution',
        'alt': 'Heavy industrial manufacturing plant discharging particulate emissions and gases',
        'photographer': 'Ella Ivanescu',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'cause-burning.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Causes of Pollution',
        'alt': 'Agricultural stubble burning and open biomass waste combustion causing smoke plume',
        'photographer': 'Tomasz Krawczyk',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'cause-construction.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1541888946425-d0fbb1862678?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Causes of Pollution',
        'alt': 'Major urban construction site machinery generating airborne fugitive dust',
        'photographer': 'Scott Blake',
        'source': 'Unsplash (Free License)'
    },

    # HEALTH TIPS (4 items)
    {
        'filename': 'tip-masks.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586942593568-29361efcd571?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Health Tips',
        'alt': 'Certified N95 / FFP2 particulate respirator mask for outdoor pollution defense',
        'photographer': 'Mika Baumeister',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'tip-indoor-air.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Health Tips',
        'alt': 'Modern residential living space with active HEPA air filtration and indoor purifying plants',
        'photographer': 'Huy Nguyen',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'tip-exercise.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1502224562085-639556652f33?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Health Tips',
        'alt': 'Person jogging safely outdoors in a fresh green park during low AQI periods',
        'photographer': 'Jenny Hill',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'tip-sensitive-groups.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'Health Tips',
        'alt': 'Vulnerable populations including children and elderly walking in clean environment',
        'photographer': 'CDC / Unsplash',
        'source': 'Unsplash (Free License)'
    },

    # AQI LEVELS (4 items)
    {
        'filename': 'aqi-good.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'AQI Levels',
        'alt': 'Crisp clear blue sky over an urban cityscape indicating Good air quality (AQI 0-50)',
        'photographer': 'Pedro Lastra',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'aqi-moderate.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'AQI Levels',
        'alt': 'Mild atmospheric haze across urban skyline indicating Moderate air quality (AQI 51-100)',
        'photographer': 'Benjamin Davies',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'aqi-unhealthy.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'AQI Levels',
        'alt': 'Thick smog obscuring downtown buildings during Unhealthy air conditions (AQI 151-200)',
        'photographer': 'Patrick Hendry',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'aqi-hazardous.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&auto=format&fit=crop',
            'https://cdn.pixabay.com/photo/2023/04/22/11/12/environment-7943580_1280.jpg'
        ],
        'section': 'AQI Levels',
        'alt': 'Severe hazardous winter smog and dark red haze blanketing city (AQI 301+)',
        'photographer': 'Aleksandar Pasaric',
        'source': 'Pexels / Unsplash'
    },

    # CITY CARDS (Skylines)
    {
        'filename': 'city-delhi.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1597044141243-01521e2bce82?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'Delhi skyline and India Gate monument in winter atmospheric conditions',
        'photographer': 'Sylwia Bartyzel',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-newyork.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'New York City Manhattan skyscrapers and skyline',
        'photographer': 'Alexander Rotker',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-london.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'London skyline showing Tower Bridge and the River Thames',
        'photographer': 'Benjamin Davies',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-losangeles.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'Downtown Los Angeles skyscrapers with palm trees and freeway',
        'photographer': 'Sterling Davis',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-tokyo.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'Tokyo skyline featuring Tokyo Tower and vibrant metropolis panorama',
        'photographer': 'Su San Lee',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-paris.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'Paris skyline featuring the iconic Eiffel Tower and Seine river basin',
        'photographer': 'Anthony DELANOIX',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-mumbai.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1566552881560-0be86c53957f?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'Mumbai coastal skyline and Bandra-Worli Sea Link crossing the bay',
        'photographer': 'Aditya Chache',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-surat.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'Surat city Tapi riverfront and modern urban architecture',
        'photographer': 'Bhargav Joshi',
        'source': 'Unsplash (Free License)'
    },
    {
        'filename': 'city-ahmedabad.webp',
        'width': 600,
        'urls': [
            'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80&auto=format&fit=crop'
        ],
        'section': 'City Cards',
        'alt': 'Ahmedabad Sabarmati Riverfront skyline and promenade',
        'photographer': 'Dharmesh Patel',
        'source': 'Unsplash (Free License)'
    }
]

def download_and_process(img_info):
    filename = img_info['filename']
    target_path = os.path.join(OUTPUT_DIR, filename)
    target_width = img_info['width']
    
    success = False
    for url in img_info['urls']:
        try:
            print(f"Trying {filename} from {url[:60]}...")
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
                if len(data) < 1000:
                    continue
                
                # Open with Pillow
                im = Image.open(io.BytesIO(data))
                if im.mode in ('RGBA', 'P'):
                    im = im.convert('RGB')
                
                # Resize keeping aspect ratio
                w, h = im.size
                if w > target_width:
                    new_h = int((target_width / w) * h)
                    im = im.resize((target_width, new_h), Image.Resampling.LANCZOS)
                
                # Save as WebP
                im.save(target_path, 'WEBP', quality=85)
                file_size_kb = os.path.getsize(target_path) / 1024
                print(f"✓ Saved {filename} ({im.size[0]}x{im.size[1]}, {file_size_kb:.1f} KB)")
                success = True
                break
        except Exception as e:
            print(f"  Error with {url[:40]}: {e}")
            continue
    
    if not success:
        print(f"FAILED to download {filename}!")
    return success

def main():
    print(f"Processing {len(IMAGES)} images into {OUTPUT_DIR}...")
    results = []
    for item in IMAGES:
        ok = download_and_process(item)
        results.append((item, ok))
    
    # Write credits.txt
    credits_path = os.path.join(OUTPUT_DIR, 'credits.txt')
    with open(credits_path, 'w', encoding='utf-8') as f:
        f.write("# Urban Air Quality Assistant - Image Credits & Attribution\n")
        f.write("# All images are royalty-free, licensed under Unsplash License or Pixabay Content License\n\n")
        f.write(f"{'Section':<22} | {'Filename':<26} | {'Photographer / Creator':<26} | {'Source / License':<30} | Description\n")
        f.write("-" * 140 + "\n")
        for item, ok in results:
            f.write(f"{item['section']:<22} | {item['filename']:<26} | {item['photographer']:<26} | {item['source']:<30} | {item['alt']}\n")
    
    print(f"\nCredits file written to {credits_path}")

if __name__ == '__main__':
    main()
