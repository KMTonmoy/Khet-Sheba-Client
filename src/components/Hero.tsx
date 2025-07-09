import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-green-50 py-16 px-4 overflow-hidden border-b border-gray-200">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute inset-0 bg-[url('/images/rice-pattern-light.svg')] bg-repeat"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              <span className="block">ক্ষেত-সেবা</span>
              <span className="text-green-600">স্মার্ট কৃষি প্ল্যাটফর্ম</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              প্রযুক্তি ও কৃষির সমন্বয়ে গড়ে উঠেছে বাংলাদেশের প্রথম ডিজিটাল কৃষি সহায়তা ব্যবস্থা
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/crop-doctor" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                ফসল পরামর্শ নিন
              </Link>
              <Link 
                href="/market" 
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-all"
              >
                বাজার বিশ্লেষণ
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <div className="flex -space-x-2 mr-3">
    <img
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK7uIRU9Bck46L1hz5etWckpzEvC5zGCEonA&s"
  alt="Farmer 1"
  className="w-8 h-8 rounded-full border-2 border-white object-cover"
/>
<img
  src="https://content.jdmagicbox.com/comp/raipur-chhattisgarh/i7/9999px771.x771.190909201907.m2i7/catalogue/farmar-raipur-chhattisgarh-gxktuuyeb7.jpg?clr="
  alt="Farmer 2"
  className="w-8 h-8 rounded-full border-2 border-white object-cover"
/>
<img
                    src="https://static.vecteezy.com/system/resources/thumbnails/034/910/831/small/young-indian-farmer-standing-at-the-agricultural-field-vector.jpg"
  alt="Farmer 3"
  className="w-8 h-8 rounded-full border-2 border-white object-cover"
/>

                </div>
                <span className="text-sm font-medium text-gray-700">২০,০০০+ কৃষক সদস্য</span>
              </div>
              
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">৯৯% সন্তুষ্টি</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Replace the SVG with an actual image */}
              <img
                className="object-cover w-full h-full"
                src="https://www.sciencing.com/sciencing/benefits-agriculture-farmers-6973506/f38449d949b744a8ae5cb79029f8165d.jpg"   
                alt="Farming Image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
