import React from 'react';

const MarketPrice = () => {
  // Sample product data
  const products = [
    {
      category: 'সার',
      items: [
        { name: 'ইউরিয়া সার', weight: '৫০ কেজি', price: '৯৫০ টাকা', lastUpdated: '২৪ ঘন্টা আগে' },
        { name: 'টিএসপি সার', weight: '৫০ কেজি', price: '১,২০০ টাকা', lastUpdated: 'গতকাল' },
        { name: 'এমওপি সার', weight: '৫০ কেজি', price: '১,১০০ টাকা', lastUpdated: '৩ দিন আগে' },
        { name: 'জিপসাম সার', weight: '৫০ কেজি', price: '৮০০ টাকা', lastUpdated: '১ সপ্তাহ আগে' }
      ]
    },
    {
      category: 'বীজ',
      items: [
        { name: 'ব্রি ধান-২৮', weight: '৫ কেজি', price: '১,২০০ টাকা', lastUpdated: 'আজ' },
        { name: 'ব্রি ধান-২৯', weight: '৫ কেজি', price: '১,৩০০ টাকা', lastUpdated: 'আজ' },
        { name: 'হাইব্রিড ভুট্টা', weight: '১ কেজি', price: '৪৫০ টাকা', lastUpdated: 'গতকাল' },
        { name: 'সরিষা বীজ', weight: '১ কেজি', price: '৩২০ টাকা', lastUpdated: '২ দিন আগে' }
      ]
    },
    {
      category: 'কীটনাশক',
      items: [
        { name: 'এসাটাফ', weight: '১০০ মিলি', price: '২৫০ টাকা', lastUpdated: 'আজ' },
        { name: 'রিপকর্ড', weight: '১০০ মিলি', price: '৩০০ টাকা', lastUpdated: 'গতকাল' },
        { name: 'ম্যালাথিয়ন', weight: '২৫০ মিলি', price: '৪০০ টাকা', lastUpdated: '৩ দিন আগে' },
        { name: 'কার্বারিল', weight: '৫০ গ্রাম', price: '১৫০ টাকা', lastUpdated: '১ সপ্তাহ আগে' }
      ]
    },
    {
      category: 'কৃষি উপকরণ',
      items: [
        { name: 'ড্রিপ পাইপ', weight: '১০০ মিটার', price: '২,৫০০ টাকা', lastUpdated: 'গতকাল' },
        { name: 'স্প্রেয়ার মেশিন', weight: '৫ লিটার', price: '১,৮০০ টাকা', lastUpdated: '২ দিন আগে' },
        { name: 'পলিথিন শীট', weight: '৪০ মাইক্রন', price: '১,২০০ টাকা', lastUpdated: '১ সপ্তাহ আগে' },
        { name: 'জৈব সার', weight: '৫ কেজি', price: '৩৫০ টাকা', lastUpdated: 'আজ' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">কৃষি পণ্যের বাজার দর</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
            <div className="bg-green-600 px-4 py-3">
              <h2 className="text-xl font-semibold text-white">{category.category}</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.weight}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-700">{item.price}</p>
                        <p className="text-xs text-gray-400">{item.lastUpdated}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">দ্রষ্টব্য:</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>দামগুলো স্থানীয় বাজার অনুযায়ী পরিবর্তিত হতে পারে</li>
          <li>প্রতিদিন সকাল ১০টায় দাম হালনাগাদ করা হয়</li>
          <li>আপনার এলাকার সঠিক দর জানতে স্থানীয় কৃষি সম্প্রসারণ অফিসে যোগাযোগ করুন</li>
        </ul>
      </div>
    </div>
  );
};

export default MarketPrice;